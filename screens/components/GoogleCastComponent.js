import { View, Text } from 'react-native'
import React from 'react'
import {CastButton, useCastState, useRemoteMediaClient} from 'react-native-google-cast'
const GoogleCastComponent = ({clip}) => {
    const client = useRemoteMediaClient();
    const status = useCastState();
    console.log(status)
    if(client && clip){
        client.loadMedia({
            mediaInfo: {
                contentUrl:
                    clip,
                contentType: 'video/mp4',
            },
        })
    }
  return (
    <View>
      <CastButton style={{ width: 24, height: 24, tintColor: 'green' }}/>
    </View>
  )
}

export default GoogleCastComponent