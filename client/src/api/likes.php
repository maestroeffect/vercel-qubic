<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");

$conn = new mysqli("localhost", "qubicweb_comments_db", "exceedGrace2", "qubicweb_comments_db");


if ($conn->connect_error) {
    die(json_encode(["error" => "DB connection failed"]));
}

// Create table if not exists
$conn->query("
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        likes INT DEFAULT 0 CHECK (likes >= 0)
    ) ENGINE=InnoDB;
");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
    $slug = $_GET['slug'] ?? null;
    if (!$slug) {
        echo json_encode(["error" => "Missing slug"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT likes FROM posts WHERE slug = ?");
    $stmt->bind_param("s", $slug);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    echo json_encode($result ?: ["likes" => 0]);
}

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $slug = $data['slug'] ?? null;
    if (!$slug) {
        echo json_encode(["error" => "Missing slug"]);
        exit;
    }

    // Ensure post exists
    $stmt = $conn->prepare("INSERT IGNORE INTO posts (slug) VALUES (?)");
    $stmt->bind_param("s", $slug);
    $stmt->execute();

    $action = $data['action'] ?? 'like';

    if ($action === 'like') {
        $stmt = $conn->prepare("UPDATE posts SET likes = likes + 1 WHERE slug = ?");
        $stmt->bind_param("s", $slug);
        $stmt->execute();
        echo json_encode(["message" => "Post liked"]);
    } elseif ($action === 'unlike') {
        $stmt = $conn->prepare("UPDATE posts SET likes = GREATEST(likes - 1, 0) WHERE slug = ?");
        $stmt->bind_param("s", $slug);
        $stmt->execute();
        echo json_encode(["message" => "Post unliked"]);
    } else {
        echo json_encode(["error" => "Invalid action"]);
    }
}
