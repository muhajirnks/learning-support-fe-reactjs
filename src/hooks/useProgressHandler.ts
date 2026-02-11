import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";

const useProgressBarHandler = (props?: Partial<NProgress.NProgressOptions>) => {
   const navigation = useNavigation();

   useEffect(() => {
      if(props) {
         NProgress.configure(props);
      }
   }, [props]);

   useEffect(() => {
      if (navigation.state === "loading") {
         NProgress.start();
      } else {
         NProgress.done();
      }
   }, [navigation.state]);
};

export default useProgressBarHandler;
