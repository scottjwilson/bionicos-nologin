import CartItem from "@/components/Cart/CartItem";
import formatMoney from "@/lib/formatMoney";
import { useState } from "react";
import { useCart } from "@/lib/cartState";
import client from "@/lib/apollo-client";
import gql from "graphql-tag";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import { FiPlusCircle } from "react-icons/fi";

import {
  calculateStripeTotal,
  calculateSubAmount,
  calculateTax,
} from "../lib/calcOrder";
import ClosedModal from "@/components/ClosedModal";

import { NextSeo } from "next-seo";

export default function CheckoutPage() {
  const user = {
    id: "19302bc8-b134-4506-80af-b17029bbcbca",
    email: "good@test.com",
    user_metadata: {
      username: "Test User",
    },
  };

  const { cart, totalCartPrice } = useCart();
  const [clientSecret, setClientSecret] = useState(null);
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState(true);
  const [couponOff, setCouponOff] = useState(0);
  const [couponDetail, setCouponDetail] = useState("");

  const applyCoupon = async () => {
    const { data, error } = await client.query({
      query: gql`
        query getCoupon($id: String!) {
          coupons(where: { code: $id }) {
            id
            code
            details
            isActive
            percentOff
          }
        }
      `,
      variables: { id: couponCode },
    });
    if (!data || !data.coupons[0].isActive) {
      alert("Invalid coupon");
      setCouponOff(0);
      setCouponDetail("");
    } else {
      setCouponOff(data.coupons[0].percentOff / 100);
      setCouponDetail(data.coupons[0].details);
      alert("Coupon applied");
    }
  };

  const title = `Checkout`;
  const description = `Complete your order`;
  return (
    <>
      <NextSeo title={title} description={description} />
      <ClosedModal />
      <div className="max-w-2xl mx-auto pt-12 mt-2 px-4 bg-white shadow-xl rounded-xl">
        <Link href="/menu">
          <a className="btn btn-sm btn-primary">
            {" "}
            <FiPlusCircle className="text-xl mr-1" /> Add More Items
          </a>
        </Link>
        <div>
          <div>
            <div>
              <div className="my-4">
                <h1>YOUR ORDER SUMMARY</h1>

                {cart.map((item, index) => {
                  return (
                    <div key={index}>
                      <CartItem item={item} index={index} />
                    </div>
                  );
                })}
              </div>

              <div className="form-control px-2">
                <label className="label">
                  <span className="label-text font-bold">
                    Any special instructions?
                  </span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.currentTarget.value)}
                  className="textarea h-24 textarea-bordered textarea-primary"
                  placeholder="Add a note for us here"
                ></textarea>

                {/* <label className="label" htmlFor="coupon">
                  <span className="label-text font-bold mt-2">
                    Enter a coupon
                  </span>
                </label>
                <input
                  className="input-bordered input input-primary"
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.currentTarget.value);
                  }}
                />
                <button onClick={applyCoupon} className="btn btn-ghost mt-2">
                  Apply Coupon
                </button> */}
              </div>
              {/* <div>{couponDetail}</div> */}
              <div className="my-2 ">
                <div className="p-2 tracking-wide flex justify-between">
                  <div>
                    <h6>Subtotal</h6>
                  </div>
                  <div>
                    <h6>{formatMoney(calculateSubAmount(cart, couponOff))}</h6>
                  </div>
                </div>
                <hr />

                <div className="p-2 tracking-wide flex justify-between">
                  <div>
                    <h6>Tax</h6>
                  </div>
                  <div>
                    <h6>{formatMoney(calculateTax(cart, couponOff))}</h6>
                  </div>
                </div>
                <hr />

                <div className="p-2 tracking-wide flex justify-between">
                  <div>
                    <h1 className="font-bold">Total</h1>
                  </div>
                  <div>
                    <h1 className="font-bold">
                      {formatMoney(calculateStripeTotal(cart, couponOff))}
                    </h1>
                  </div>
                </div>
              </div>
              {couponOff !== 0 ? (
                <h4 className="text-center text-primary">
                  You saved {formatMoney(totalCartPrice * couponOff)}
                </h4>
              ) : (
                <></>
              )}
              <div className="rounded-lg pb-2">
                <CheckoutForm user={user} notes={notes} cart={cart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
