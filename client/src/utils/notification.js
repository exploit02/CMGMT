import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
export const notification = {
    createNotification (status,message){
        switch (status) {
          case 200:
             return NotificationManager.info(message);
          case 201:
            return NotificationManager.success(message);
         
          case 400:
             return NotificationManager.warning(message);
           
          case 500:
            return NotificationManager.error(message
            );
           default: 
            return NotificationManager.error(message);
      }
    }
}