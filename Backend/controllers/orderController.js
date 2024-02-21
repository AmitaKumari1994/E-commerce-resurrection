import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

//add new order
//post/api/orders
//access private

const addOrderItems = asyncHandler(async (req, res) => {
    // res.send('add order items')
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await (order.save());

        res.status(201).json(createdOrder);
    }

})

//get order items
//get /api/orders/myorder
//access private

const getMyOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders)
})

//get order by ID
//get /api/orders/:id
//access private

const getOrderById = asyncHandler(async (req, res) => {
    //  res.send('get order by id')

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new error('order not found')
    }

});

//update order to paid
//GET /api/orders/:id/pay
// access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid=true,
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }


    }else{
        res.status(404)
        throw new error('Order not found')
    }
})


//update order to delivered
//GET /api/orders/:id/pay
//access private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered=true,
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.status(200).json(updatedOrder)
    }

    else{
        res.status(404)
        throw new Error('Order not found')
    }
})


//get all orders
//GET /api/orders
//access private/Admin

const getOrders = asyncHandler(async (req, res) => {
const orders = await Order.find({}).populate('user','name id')
res.status(200).json(orders)
})

export {
    addOrderItems,
    getMyOrder,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}