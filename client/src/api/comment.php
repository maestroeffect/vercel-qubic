<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Respond to preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
$conn = new mysqli("localhost", "qubicweb_comments_db", "exceedGrace2", "qubicweb_comments_db");

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Database connection failed"]));
}

$method = $_SERVER['REQUEST_METHOD'];

// ✅ Always ensure table exists before processing
function createCommentsTableIfNotExists($conn)
{
    $tableCheck = $conn->query("SHOW TABLES LIKE 'comments'");
    if ($tableCheck->num_rows === 0) {
        $createTableSQL = "
            CREATE TABLE comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(255),
                name VARCHAR(255),
                email VARCHAR(255),
                content TEXT,
                likes INT DEFAULT 0,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB;
        ";
        if (!$conn->query($createTableSQL)) {
            http_response_code(500);
            die(json_encode(["error" => "Failed to create comments table"]));
        }
    }
}

// ✅ Ensure table exists before both GET and POST
createCommentsTableIfNotExists($conn);

if ($method === "GET") {
    if (!isset($_GET['slug'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing slug parameter"]);
        exit;
    }

    $slug = $_GET['slug'];
    $stmt = $conn->prepare("SELECT name, content, timestamp FROM comments WHERE slug = ? AND timestamp >= NOW() - INTERVAL 3 WEEK ORDER BY timestamp DESC");
    $stmt->bind_param("s", $slug);
    $stmt->execute();
    $result = $stmt->get_result();

    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }

    if (count($comments) === 0) {
        echo json_encode(["message" => "No comments available"]);
    } else {
        echo json_encode($comments);
    }

    exit;
}

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        empty($data['name']) ||
        empty($data['email']) ||
        empty($data['message']) ||
        empty($data['slug'])
    ) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }

    $name = $data['name'];
    $email = $data['email'];
    $content = $data['message'];
    $slug = $data['slug'];

    $stmt = $conn->prepare("INSERT INTO comments (slug, name, email, content) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $slug, $name, $email, $content);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Comment added"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to add comment"]);
    }

    exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
$conn->close();
