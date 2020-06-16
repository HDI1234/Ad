<?php
include 'database.php';
$bmiperson = [];

$sql = "SELECT * FROM bmiperson";
if($result = $db->query($sql))
{
  $i = 0;
  while($row = $result->fetch_assoc())
  {
    $bmiperson[$i]['Bmi_id'] = $row['Bmi_id'];
    $bmiperson[$i]['Name'] = $row['Name'];
    $bmiperson[$i]['Weight'] = $row['Weight'];
    $bmiperson[$i]['Height'] = $row['Height'];
    $bmiperson[$i]['BMI'] = $row['BMI'];
    $bmiperson[$i]['Category'] = $row['Category'];
    $i++;
  }
  echo json_encode($bmiperson);
}
else
{
  http_response_code(404);
}
?>
