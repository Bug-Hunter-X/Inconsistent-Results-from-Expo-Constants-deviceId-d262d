```javascript
import * as Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

// bugSolution.js
export async function getDeviceId() {
  let deviceId = await SecureStore.getItemAsync('deviceId');
  if (!deviceId) {
    const expoDeviceId = Constants.deviceId;
    if(expoDeviceId) {
      await SecureStore.setItemAsync('deviceId', expoDeviceId);
      deviceId = expoDeviceId;
    } else {
      deviceId = generateUUID(); //fallback to generate a uuid
      await SecureStore.setItemAsync('deviceId', deviceId);
    }
  }
  return deviceId;
}

function generateUUID() {
  // Simple UUID generation for demonstration
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```