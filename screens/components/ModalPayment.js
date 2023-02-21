import React,{useRef,useState} from 'react'
import tw from 'tailwind-rn'
import { View, Text,StyleSheet,TouchableOpacity, Button } from 'react-native'
import ReusableBottomSheet from './ReusableBottomSheet';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SubscriptionModule from './SubscriptionModule';
import PaymentStandAloneModule from './PaymentStandAloneModule';

const Tab = createMaterialTopTabNavigator();

const Tabs = ({amount,amountFee,totalAmount, sheetRef,setPayed,buyClip}) => {
    return (
      <Tab.Navigator screenOptions={{tabBarLabelStyle: { fontSize: 16,fontFamily:'Nunito_600SemiBold' }}}>
        <Tab.Screen name="Subscribe">
          {()=><SubscriptionModule buyClip={buyClip} amount={amount} amountFee={amountFee} sheetRef={sheetRef} setPayed={setPayed}/>}
        </Tab.Screen>
        <Tab.Screen name="Pay Just a Clip">
        {()=><PaymentStandAloneModule amount={amount} amountFee={amountFee} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

const ModalPayment = ({sheetRef,isOpen,setIsOpen,amount,amountFee,totalAmount,setPayed,buyClip}) => {

  const snapPoints = ["42%","75%"]
  
   
    const _renderModalContent = () => (
        <View style={styles.modalContent}>
          <Tabs buyClip={buyClip} amount={amount} sheetRef={sheetRef} amountFee={amountFee} totalAmount={totalAmount} setPayed={setPayed} />
          
        </View>
    )

    return (
        <ReusableBottomSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        isOpen={isOpen}
        setIsOpen={setIsOpen} 
        
        >
          {_renderModalContent()}
        </ReusableBottomSheet>
    )
}

export default ModalPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        height: 320,
        width: '100%',
        backgroundColor: 'whitesmoke',
        padding: 22,
        justifyContent: 'center',
        borderRadius: 12,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
        
      }
})