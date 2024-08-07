from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
from io import BytesIO
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN, MeanShift

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Existing data generation functions
def generate_2d_data():
    np.random.seed(42)
    cluster_1 = np.random.randn(100, 2) + [2, 2]
    cluster_2 = np.random.randn(100, 2) + [8, 8]
    cluster_3 = np.random.randn(100, 2) + [5, 15]
    data = np.vstack((cluster_1, cluster_2, cluster_3))
    df = pd.DataFrame(data, columns=['x', 'y'])
    return df

def generate_hierarchical_data():
    np.random.seed(42)
    main_cluster_1 = np.random.randn(100, 2) + [5, 5]
    sub_cluster_1 = main_cluster_1 + np.random.randn(100, 2) * 0.2
    main_cluster_2 = np.random.randn(100, 2) + [15, 15]
    sub_cluster_2 = main_cluster_2 + np.random.randn(100, 2) * 0.2
    data = np.vstack((main_cluster_1, sub_cluster_1, main_cluster_2, sub_cluster_2))
    df = pd.DataFrame(data, columns=['x', 'y'])
    return df

def generate_dbscan_data():
    np.random.seed(42)
    dense_cluster = np.random.randn(300, 2) * 0.5 + [5, 5]
    sparse_cluster = np.random.randn(100, 2) * 2 + [15, 15]
    data = np.vstack((dense_cluster, sparse_cluster))
    df = pd.DataFrame(data, columns=['x', 'y'])
    return df

def generate_mean_shift_data():
    np.random.seed(42)
    cluster_1 = np.random.randn(50, 2) + [2, 2]
    cluster_2 = np.random.randn(300, 2) + [8, 8]
    cluster_3 = np.random.randn(150, 2) + [5, 15]
    data = np.vstack((cluster_1, cluster_2, cluster_3))
    df = pd.DataFrame(data, columns=['x', 'y'])
    return df

# New clustering functions
def apply_kmeans(data, n_clusters=3):
    kmeans = KMeans(n_clusters=n_clusters)
    labels = kmeans.fit_predict(data)
    return labels

def apply_hierarchical(data, n_clusters=3):
    hierarchical = AgglomerativeClustering(n_clusters=n_clusters)
    labels = hierarchical.fit_predict(data)
    return labels

def apply_dbscan(data, eps=0.5, min_samples=5):
    dbscan = DBSCAN(eps=eps, min_samples=min_samples)
    labels = dbscan.fit_predict(data)
    return labels

def apply_mean_shift(data):
    mean_shift = MeanShift()
    labels = mean_shift.fit_predict(data)
    return labels

@app.route('/generate_data', methods=['GET'])
def generate_data():
    dataset_type = request.args.get('type')
    if dataset_type == '2d':
        df = generate_2d_data()
    elif dataset_type == 'hierarchical':
        df = generate_hierarchical_data()
    elif dataset_type == 'dbscan':
        df = generate_dbscan_data()
    elif dataset_type == 'mean_shift':
        df = generate_mean_shift_data()
    else:
        return jsonify({"error": "Invalid dataset type"}), 400

    output = BytesIO()
    df.to_csv(output, index=False)
    output.seek(0)

    return send_file(output, mimetype='text/csv', as_attachment=True, download_name=f'{dataset_type}_data.csv')

@app.route('/cluster_data', methods=['POST'])
def cluster_data():
    try:
        data = pd.read_csv(request.files['file'])
        algorithm = request.form.get('algorithm')
        if algorithm == 'kmeans':
            labels = apply_kmeans(data.values)
        elif algorithm == 'hierarchical':
            labels = apply_hierarchical(data.values)
        elif algorithm == 'dbscan':
            labels = apply_dbscan(data.values)
        elif algorithm == 'mean_shift':
            labels = apply_mean_shift(data.values)
        else:
            return jsonify({"error": "Invalid algorithm type"}), 400

        data['cluster'] = labels
        output = BytesIO()
        data.to_csv(output, index=False)
        output.seek(0)

        return send_file(output, mimetype='text/csv', as_attachment=True, download_name=f'clustered_data.csv')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
