import logging
import json
from aws_lambda_powertools.utilities.data_classes import event_source
from common.model.api_event import APIGatewayProxyEvent
from common.db.db_ops import DdbTable
from botocore.exceptions import ClientError

ddbtable = DdbTable()

@event_source(data_class=APIGatewayProxyEvent)
def handler(event: APIGatewayProxyEvent, context):
    logging.info('Creating User Record', extra={"message_object": event})
    try:
        payload = event['body']
        
        item_data = {
            'PK': payload['PK']['S'],
            'SK': payload['SK']['S'],
            'GSI_PK': payload['GSI_PK']['S'],
            'GSI_SK': payload['GSI_SK']['S'],
            'user_data': {
                'user_id': payload['user_data']['M']['user_id']['S'],
                'name': payload['user_data']['M']['name']['S'],
                'email': payload['user_data']['M']['email']['S'],
                'creation_date': payload['user_data']['M']['creation_date']['S']
            }
        }

        ddbtable._put_item(Item=item_data)

        return {
            'statusCode': 200,
            'body': json.dumps('User record created successfully')
        }
    
    except ClientError as e:
        logging.error(f'Error creating user record: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error creating user record: {str(e)}')
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Unexpected error: {str(e)}')
        }