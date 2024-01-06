from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEvent

class APIGatewayProxyEvent(APIGatewayProxyEvent):
    @property
    def incoming_path(self) -> str:
        return self.path
    
    @property
    def user_id(self) -> str:
        return self.path_parameters["user_id"]
    
    @property
    def itinerary_id(self) -> str:
        return self.path_parameters["itinerary_id"]