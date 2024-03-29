// import { useState } from "react";
// import { decode } from "html-entities";

// const NewsletterSubscribe = ({ status, message, onValidated }) => {
//   const [error, setError] = useState(null);
//   const [email, setEmail] = useState(null);

//   /**
//    * Handle form submit.
//    *
//    * @return {{value}|*|boolean|null}
//    */
//   const handleFormSubmit = () => {
//     setError(null);

//     if (!email) {
//       setError("Please enter a valid email address");
//       return null;
//     }

//     const isFormValidated = onValidated({ EMAIL: email });

//     // On success return true
//     return email && email.indexOf("@") > -1 && isFormValidated;
//   };

//   /**
//    * Handle Input Key Event.
//    *
//    * @param event
//    */
//   const handleInputKeyEvent = (event) => {
//     setError(null);
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//       // Cancel the default action, if needed
//       event.preventDefault();
//       // Trigger the button element with a click
//       handleFormSubmit();
//     }
//   };

//   /**
//    * Extract message from string.
//    *
//    * @param {String} message
//    * @return {null|*}
//    */
//   const getMessage = (message) => {
//     if (!message) {
//       return null;
//     }
//     const result = message?.split("-") ?? null;
//     if ("0" !== result?.[0]?.trim()) {
//       return decode(message);
//     }
//     const formattedMessage = result?.[1]?.trim() ?? null;
//     return formattedMessage ? decode(formattedMessage) : null;
//   };

//   const buttonClasses = `shadow absolute top-0 right-0 rounded-l-none btn bg-gradient-to-r from-primary to-purple-800 border-none`;

//   return (
//     <>
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text dark:text-white -mb-1 font-sean text-center mx-auto">
//             Subscribe to our newsletter for updates!
//           </span>
//         </label>
//         <div className="relative">
//           <input
//             onChange={(event) => setEmail(event?.target?.value ?? "")}
//             type="email"
//             placeholder="Your email"
//             onKeyUp={(event) => handleInputKeyEvent(event)}
//             className="w-full pr-16 input input-bordered dark:text-black dark:bg-dk-two shadow"
//           />
//           <button className={buttonClasses} onClick={handleFormSubmit}>
//             Submit
//           </button>
//         </div>
//       </div>
//       <div className="">
//         {status === "sending" && <div>Sending...</div>}
//         {status === "error" || error ? (
//           <div
//             className="newsletter-form-error"
//             dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
//           />
//         ) : null}
//         {status === "success" && status !== "error" && !error && (
//           <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
//         )}
//       </div>
//     </>
//   );
// };

// export default NewsletterSubscribe;

import React from "react";

export default function NewsletterSubscribe() {
  return <div>NewsletterSubscribe</div>;
}
