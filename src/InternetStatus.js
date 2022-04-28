import { useRef } from "react";
import { toast } from "react-toastify";

const NetworkStatus = ()=>{
  const toastId = useRef(null);
  const NetStatusNotification = (message)=>{
    toastId.current = toast.info(message,{
      position:"bottom-left", 
      autoClose: false, 
      hideProgressBar:true, 
      closeOnClick:false,
      pauseOnHover:false
    })
  }
  const update = ()=>{
    toast.update(toastId.current, {render:"You are back online!!", type:toast.TYPE.INFO, autoClose:5000, closeOnClick:true})
  }

  window.addEventListener("load",()=>{
    !navigator.onLine && NetStatusNotification("You are offline. Please check your connection.", false)
  })

  window.addEventListener("online",()=>{
    update();
  });
  window.addEventListener("offline",()=>{
    NetStatusNotification("You are offline. Please check your connection.", false);
  })
  return null;
}

export default NetworkStatus;