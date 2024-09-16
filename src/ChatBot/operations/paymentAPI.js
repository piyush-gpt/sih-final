import toast from "react-hot-toast";

import { apiConnector } from "../services/apiConnector";
function loadScript (src) {
    return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src=src;
    script.onload = () => {
    resolve(true);
    }
    script.onerror= () =>{
    resolve(false);
    }
    document.body.appendChild(script);
    })
}
export async function buyTickets(messages){
    const toastId=toast.loading("Loading.....");
    console.log('"fine till here 100');
    try{
        let res=loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load")
            return;
        }
        // initiate the order
        const orderResponse=await apiConnector("POST" ,process.env.REACT_APP_PAYMENT_API, { text: "RETURN BOOKING INFORMATION", allMessages: messages })

    console.log('"fine till here 1');
    
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        // create options
        var options = {
            "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            "amount": `${orderResponse.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": orderResponse.data.data.currency,
            "name": "Museum Sathi", //your business name
            "description": "Thank You for purchasing",
            "order_id": orderResponse.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name":"Piyush Gupta", //your customer's name
                "email": "piyushthegreat1@gmail.com",
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, orderResponse.data.mailContent );
                //verifyPayment
                verifyPayment(response)
                }
            
        };
        const paymentObject = new window.Razorpay (options);
        console.log('"fine till here 2');
    
        paymentObject.open();
        paymentObject.on("payment. failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    }
    catch(e){
        console.log(e);
        toast.error(e.message)
    }
    toast.dismiss(toastId)

}

async function sendPaymentSuccessEmail(response, amount, mailContent){
    try{
        await apiConnector("POST", process.env.REACT_APP_EMAIL_PAYMENT_API, {orderId:response.razorpay_order_id, paymentId:response.razorpay_payment_id, amount, mailContent })
    }
    catch(e){
        console.log("PAYMENT SUCCESS EMAIL ERROR..", e);
    }
}

async function verifyPayment(bodyData){
    const toastId=toast.loading("Verifying Payment......")
    try{

        const res=await apiConnector("POST", process.env.REACT_APP_VERIFY_PAYMENT_API,bodyData)

        if(!res.data.success){
            throw new Error(res.data.message)
        }

        toast.success("payment Successful")
    }
    catch(e){
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastId)

}