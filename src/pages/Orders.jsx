import React from 'react'
import Title from "../components/Title";
import { useEffect } from 'react';
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'
import { useState } from 'react';
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] =  useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendURL + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])


  return (
    <div>
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
      </div>
      {
        orders.map((order, index) => (
          <div key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              {order.items.map((item, index) => {
                if(index === order.items.length -1){
                  return <p key={index}>{item.name} x {item.quantity} <span> {item.size} </span></p>
                } else{
                  <p key={index}>{item.name} x {item.quantity} <span> {item.size} </span> , </p>
                }
              })}
            </div>
            <p>{order.address.firstName + " " + order.address.lastName}</p>
            <div>
              <p>{order.address.street}</p>
              <p>{order.address.division + "," + order.address.country }</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}
export default Orders
