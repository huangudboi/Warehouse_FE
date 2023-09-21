import { defineStore } from 'pinia'
import { addNewAPI } from '@/api/order/addnew'
import { ref } from 'vue'
import { MODAL_TYPE } from '@/constants'
import { useModalStore } from './modal'

const defaultState = {
    supplierName: '',
    supplierEmail: '',
    supplierPhoneNumber: '',
}

export const useNewOrderStore = defineStore('neworder', () => {
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
    return { addnew }
})
    