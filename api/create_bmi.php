<?php
include 'database.php';
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata, true);
  //validate
  if(trim($request['Name']) === '' || (float)($request['Weight']) < 0 || (float)($request['Height']) < 0 || (float)($request['BMI']) < 0 || trim($request['Category']) === '' ) {
    return http_response_code(400);
  }
  $Name = mysqli_real_escape_string($db, trim($request['Name']));
  $Weight = mysqli_real_escape_string($db, (float)$request['Weight']);
  $Height = mysqli_real_escape_string($db, (float)$request['Height']);
  $BMI = mysqli_real_escape_string($db, (float)$request['BMI']);
  $Category = mysqli_real_escape_string($db, trim($request['Category']));
  $sql = "INSERT INTO bmiperson (Name, Weight, Height, BMI, Category)" .
    " VALUES ('$Name', '$Weight', '$Height', '$BMI', '$Category')";
  if ($db->query($sql)) {
    http_response_code(201);
    $bmiperson = [
      'Bmi_id' => mysqli_insert_id($db),
      'Name' => $Name,
      'Weight' => $Weight,
      'Height' => $Height,
      'BMI' => $BMI,
      'Category' => $Category,
    ];
    echo json_encode($bmiperson);
  } else {
    http_response_code(422);
  }
}
