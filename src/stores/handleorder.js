import { defineStore } from 'pinia'
import { addNewAPI } from '@/api/order/index'
import { deleteOrderAPI } from '@/api/order/index'
import { changeStatusAPI } from '@/api/order/index'
import { ref } from 'vue'
import { MODAL_TYPE } from '@/constants'
import { useModalStore } from './modal'

const defaultState = {
    supplierName: '',
    supplierEmail: '',
    supplierPhoneNumber: '',
}

export const useOrderStore = defineStore('neworder', () => {
    const listDataOrder = ref({ ...defaultState })
    const addnew = async (params) => {
        const {openModal} = useModalStore()
        const response = await addNewAPI(params)
        if (response?.success||response.status===1) {
            listDataOrder.value = { ...listDataOrder.value, ...response.data }
            openModal ({
                open: true,
                type: MODAL_TYPE.SUCCESS,
                title: 'Success',
                content: 'Added new order successfully.',
                okText: 'OK'
            })
            return response
        }
        return null
    }
    const deleteOrder = async (params) => {
        const {openModal} = useModalStore()
        const response = await deleteOrderAPI(params)
        openModal ({
            open: true,
            type: MODAL_TYPE.SUCCESS,
            title: 'Success',
            content: `Delete order code:${params} successfully.`,
            okText: 'OK'
        })
        return response
    }
    const changeOrder = async (params) => {
        const {openModal} = useModalStore()
        const response = await changeStatusAPI(params)
        if(response.status===0){
            openModal ({
                open: true,
                type: MODAL_TYPE.ERROR,
                title: 'Fail',
                content: `Change status order code:${params.orderCode} to deliveryFail`,
                okText: 'OK'
            })
        }
        if(response.status===1){
            openModal ({
                open: true,
                type: MODAL_TYPE.SUCCESS,
                title: 'Success',
                content: `Change status order code:${params.orderCode} to deliverySuccess`,
                okText: 'OK'
            })
        }
        return response
    }
    return { addnew, deleteOrder, changeOrder}
})
    