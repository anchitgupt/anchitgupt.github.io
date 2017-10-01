<?php

require_once '../includes/DbOperations.php';
$response = array();

/*------- IF THERE IS A POST METHOD --------*/

if ($_SERVER['REQUEST_METHOD']=='POST') {
	if (isset($_POST['username']) and isset($_POST['email']) and isset($_POST['password'])) {
			
			//OPERATE THE  DATA FURTHER
		$db = new DbOperations();

			$result = $db->createUser(
				$_POST['username'],
				$_POST['password'],
				$_POST['email'] );

		if($result == 1){

			$response['error']=false;
			$response['message']="User registered successfully";	
		}
		elseif($result == 2){
			$response['error']=true;
			$response['message']="Some error occured try again";	
		}
		elseif($result == 0){
			$response['error']=true;
			$response['message']=" User already exist with this username or email use different  username or email";	
		}
	}
	else{
		$response['error']=true;
		$response['message']="Required fields are missing";	
	}

}

/* ----- IF THERE IS NO POST METHOD ---------*/
/* ------ HERE $response IS AN ASSCIATIVE ARRAY --------*/

else{
	$response['error']=true;
	$response['message']="Invalid Request";	
}

echo json_encode($response);