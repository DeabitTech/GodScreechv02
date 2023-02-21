import { View, Text,StyleSheet,Pressable } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import HomeClip from './HomeClip'
import tw from 'tailwind-rn'
import { PanGestureHandler, } from 'react-native-gesture-handler'
const Swiper = ({contents}) => {
    let ciao="pappppaaaa";
    const translateX = useSharedValue(1)

    const cardStyle = useAnimatedStyle(()=>({
        transform:[
            {
                translateX:translateX.value * 500 - 250,
            }
        ],
       
    }))

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_) =>{
            ciao = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
        },
        onActive:(event)=>{
            translateX.value = event.translationX;
            ciao = 'x', event.translationX;
        },
        onEnd:()=>{
            console.log('end')
        }

    })

  return (
    <View style={styles.pageContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.animatedCard,cardStyle]}>
                    <View style={tw(' h-3/5 w-full border-2  border-black rounded-md')}>
                        <Text>
                            ciaooo
                            {ciao}
                        </Text>
                    </View>
                </Animated.View>
        </PanGestureHandler>
        <Pressable onPress={()=>(translateX.value = withSpring( Math.random()))}><Text>Pressami</Text></Pressable>
    </View>
  )
}
//key={card?.id} allContents={contents} video={card?.video} authorId={card?.authorId} authorName={card?.authorName} authorPhoto={card?.authorPhoto} style={styles.cardShadow} swipeRef={swipeRef}
const styles = StyleSheet.create({
    pageContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    animatedCard:{
       width:'100%',
       
       justifyContent:'center',
       alignItems:'center', 
    }
})

export default Swiper