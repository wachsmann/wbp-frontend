import notificationApi from '../../shared/components/utils/ShowNotification'


export const notificationColorOptions = {
    error:"error",
    info:"info",
    success:"success",
    warning:"warning"
  };

export const notificationDispatcherBoy = ({
  color,
  message
}) => notificationApi[color]({ message })

