import {
  supabaseClient,
  getUser,
  withAuthRequired,
  supabaseServerClient,
} from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
import Section from "@/components/Section";
import getStatus from "@/lib/getStatus";
import moment from "moment";
import formatMoney from "@/lib/formatMoney";
import parseCookies from "@/lib/cookie";
import Layout from "@/components/Layout";
import OrderItem from "@/components/OrderItem";
import { useEffect, useState } from "react";
import Loading from "@/components/icons/Loading";
import OrderSlugItem from "../../components/OrderSlugItem";
export default function OrderSlug({ order }) {
  const router = useRouter();
  const daorder = order[0];
  const items = daorder.line_items;
  // const entries = Object.entries(items);
  const [orderstatus, setOrderStatus] = useState("");

  // useEffect(() => {
  //   if (order) {
  //     const subscription = supabaseClient
  //       .from("orders")
  //       .on("UPDATE", (payload) => {
  //         alert("something changed");
  //         // setOrderStatus({ ...order, ...payload.new });
  //       })
  //       .subscribe();
  //     return () => {
  //       supabaseClient.removeSubscription(order);
  //     };
  //   }
  // }, [order]);

  return (
    <Layout title={order.id}>
      <Section>
        <button onClick={() => router.push("/dashboard")}>
          Back to Profile
        </button>
        <div className="max-w-2xl my-4 mx-auto py-8 px-4 bg-white rounded-xl shadow-xl">
          <p className="">
            {moment(daorder.created_at).format("MMMM Do YYYY")}

            <span className="font-bold ml-1">@</span>

            {moment(daorder.created_at).format(" h:mm:ss a")}
          </p>
          <pre>{JSON.stringify(orderstatus)}</pre>
          <h1>Your order</h1>
          <div>
            <small>Status:</small>
            <span className={getStatus(daorder.type)}>{daorder.type}</span>
          </div>
          <div className="rounded-lg my-2">
            {items.map((item, i) => {
              // return JSON.stringify(item);
              return <OrderSlugItem key={i} item={item} />;
            })}

            <div className="flex flex-col pt-4">
              <h2 className="my-4">
                Notes:{" "}
                <span className="font-light">
                  {daorder.notes !== "" ? <>None</> : <>{daorder.notes}</>}
                </span>
              </h2>
            </div>

            <div className=" p-2 tracking-wide flex justify-between">
              <div>
                <h6>Subtotal</h6>
              </div>
              <div>
                <h6>{formatMoney(daorder.subtotal)}</h6>
              </div>
            </div>
            <hr />

            <div className=" p-2 tracking-wide flex justify-between">
              <div>
                <h6>Tax</h6>
              </div>
              <div>
                <h6>{formatMoney(daorder.tax)}</h6>
              </div>
            </div>
            <hr />
            <div className=" p-2 tracking-wide flex justify-between">
              <div>
                <h6 className="font-bold">Total</h6>
              </div>
              <div>
                <h6 className="font-bold">{formatMoney(daorder.total)}</h6>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

const getServerSideProps = withAuthRequired({
  redirectTo: "/signin",
  getServerSideProps: async ({ params }) => {
    const { id } = params;

    const { data: order, error } = await supabaseClient
      .from("orders")
      .select("*")
      .filter("id", "eq", id);

    if (error) {
      console.log(error.message);
    }
    return {
      props: { order },
    };
  },
});

export { getServerSideProps };