import React from 'react'
import BottomSheet, {BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet'
const ReusableBottomSheet = ({sheetRef,snapPoints,setIsOpen,isOpen,children, onDismiss=()=>{}}) => {
  
  return (
    snapPoints &&
    <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={()=> {setIsOpen(false); onDismiss()}}
        index={-1}
    >
        <BottomSheetScrollView showsVerticalScrollIndicator={true}>
            {children}
        </BottomSheetScrollView>
    </BottomSheet>
  )
}

export default ReusableBottomSheet