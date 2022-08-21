import React from "react";
import Cookie from "cookie";

const withNoAuth = (WrappedComponent) => {
   const FuncComponent = ({ children, ...props }) => {
      return <WrappedComponent {...props}>{children}</WrappedComponent>;
   };

   FuncComponent.getInitialProps = async (ctx) => {
      //const props = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      let props = {}

      if (WrappedComponent.getInitialProps) {
         props = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
      }

      if (ctx.req) {
         let headerCookie = ctx.req?.headers?.cookie;
         if (typeof headerCookie !== 'string') {
            headerCookie = '';
         }

         const cookie = Cookie.parse(headerCookie);
         console.log(cookie.token)
         if (cookie.token) {
            ctx.res.writeHead(301, 
            {
               Location: "/",
            });
            ctx.res.end();
         }
      }

      return { ...props };
   };

   return FuncComponent;
};

export default withNoAuth;