import { useCart } from "@/lib/cartState";
import formatMoney from "@/lib/formatMoney";
import Modal from "./Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";

export default function FeaturedItem({ item }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modObj, setModObj] = useState({});
  const [quantity, setQuantity] = useState(1);
  function selectMod(modGroupId, id, name, price) {
    modObj[modGroupId] = { modifier: { id }, amount: price, name };
  }
  function resetMod() {
    setModObj({});
  }
  function addItemToCart(e) {
    e.preventDefault();

    addToCart(
      { id: item.id, name: item.title, price: item.price },
      Object.values(modObj),
      parseInt(quantity)
    );
    resetMod();
    setIsModalOpen(false);
    setQuantity(1);
    toast.success(`Added ${item.title}`);
  }

  const icon = ``;

  const url = buildUrl(item.image.hash, {
    cloud: {
      cloudName: "swdb",
    },
  });
  const urlBlurred = buildUrl(item.image.hash, {
    cloud: {
      cloudName: "swdb",
    },
    transformations: {
      effect: "blur:1000",
      quality: 1,
    },
  });

  return (
    <article key={item.id} className="flex justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="card w-96 bg-white shadow-xl transition ease-linear md:hover:-translate-y-1"
      >
        <div className="relative h-80 w-full">
          <Image
            src={url}
            alt={item.title}
            objectFit="cover"
            layout="fill"
            placeholder="blur"
            blurDataURL={urlBlurred}
          />
        </div>

        <div className="space-y-2 flex flex-col justify-center items-center my-4 p-2 h-1/3">
          <h1 className="text-center">{item.title}</h1>
          <p>{item.description}</p>
          <h2>{formatMoney(item.price)}</h2>
        </div>
      </button>
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={item.number ? `${item.number}. ${item.title}` : `${item.title}`}
      >
        <div className="min-h-[200px] flex flex-col justify-between ">
          {item.image && (
            <div className="relative h-96 w-full">
              <Image
                src={url}
                layout="fill"
                alt={item.title}
                objectFit="cover"
                placeholder="blur"
                blurDataURL={urlBlurred}
              />
            </div>
          )}
          <div className="px-2 my-2">
            {item.description && <p className="my-2">{item.description}</p>}

            <form onSubmit={addItemToCart} className="py-2">
              <div className="flex  items-center my-4">
                <h2 className="">Quantity</h2>

                <div className="flex border border-primary rounded-full mx-4">
                  <button
                    disabled={quantity < 2}
                    type="button"
                    onClick={() => setQuantity(quantity - 1)}
                    className="btn btn-sm btn-ghost disabled:btn-ghost"
                  >
                    <AiOutlineMinus className={icon} />
                  </button>

                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    disabled
                    // onChange={(e) => {
                    //   const newQuantity = e.currentTarget.value;
                    //   if (newQuantity > 0) setQuantity(newQuantity);
                    // }}
                    className="spin-button-none w-[2.5rem] text-center rounded-md text-xl font-bold bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="btn btn-primary btn-sm text-white"
                  >
                    <AiOutlinePlus className={icon} />
                  </button>
                </div>
              </div>
              {item.modifiers?.map((group, i) => (
                <div key={i} className="mb-2">
                  <div className="">
                    <h2>{group.name}</h2>
                    {group.required ? (
                      <div>
                        <div className="badge badge-primary rounded-full text-white">
                          Required
                        </div>
                        {group.mod.map((m, i) => (
                          <div key={i}>
                            <div className="flex items-center">
                              <label
                                htmlFor={m.id}
                                className="cursor-pointer label text-sm"
                              >
                                <input
                                  required
                                  type="radio"
                                  className="radio radio-primary radio-sm mr-2 "
                                  name={group.name}
                                  id={m.id}
                                  onChange={() => {
                                    selectMod(
                                      group.name,
                                      m.id,
                                      m.name,
                                      m.price
                                    );
                                  }}
                                />

                                {m.name}

                                {m.price === 0 ? (
                                  <div />
                                ) : (
                                  <span className="ml-1 font-bold ">
                                    + {formatMoney(m.price)}
                                  </span>
                                )}
                              </label>
                            </div>
                            <hr />
                          </div>
                        ))}
                      </div>
                    ) : group.custom ? (
                      <>custom</>
                    ) : (
                      <div>
                        <div className="badge badge-ghost rounded-full">
                          Optional
                        </div>
                        {group.mod.map((m, i) => (
                          <div key={i}>
                            <div className="flex items-center">
                              <label
                                htmlFor={m.id}
                                className="cursor-pointer label text-sm"
                              >
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary checkbox-sm mr-2 "
                                  name={group.id}
                                  id={m.id}
                                  onClick={() =>
                                    selectMod(group.id, m.id, m.name, m.price)
                                  }
                                />

                                {m.name}

                                {m.price === 0 ? (
                                  <div />
                                ) : (
                                  <span className="ml-1 font-bold ">
                                    + {formatMoney(m.price)}
                                  </span>
                                )}
                              </label>
                            </div>
                            <hr />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button className="add-to-order">Add To Order</button>

              {/* <button className="bg-primary-red py-2 text-white w-full rounded-lg">Add To Order</button>  */}
            </form>
          </div>
        </div>
      </Modal>
    </article>
  );
}
