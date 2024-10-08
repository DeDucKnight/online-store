import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "../components/Button";
import { productItems, sorts } from "../constants";
import ProductItem from "../components/ProductItem";
import Icon from "../components/Icons";
import Skeleton from "../components/Skeleton";

const ProductListSection = ({ categoryList }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSorts, setSelectedSorts] = useState("newest");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [style, setStyle] = useState({});
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const { collection } = useParams();

  const location = useLocation();

  const dropdownRef = useRef(null);
  const productListRef = useRef(null);

  const pathnames = location.pathname.split("/").filter((el) => el);

  const handlePosition = () => {
    if (dropdownRef.current) {
      const tooltipRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      let newStyle = {};
      if (tooltipRect.right > viewportWidth) {
        newStyle.left = viewportWidth - tooltipRect.right - 32;
        setStyle(newStyle);
      }
    }
  };

  const toggleCategory = (e) => {
    setSelectedCategories(selectedCategories);
  };

  const toggleSortMenu = (e) => {
    e.stopPropagation();
    if (!sortMenuOpen) {
      handlePosition();
    }
    setSortMenuOpen((prev) => {
      if (!prev) setFilterMenuOpen(false);
      return !prev;
    });
  };
  const toggleFilterMenu = (e) => {
    e.stopPropagation();
    setFilterMenuOpen((prev) => {
      if (!prev) setSortMenuOpen(false);
      return !prev;
    });
  };

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (filterMenuOpen || sortMenuOpen) {
        setSortMenuOpen(false);
        setFilterMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [filterMenuOpen, sortMenuOpen]);

  useEffect(() => {
    fetchProducts(page);

    const handleScroll = () => {
      const containerEl = document.querySelector("#container");
      const productListEl = productListRef.current;
      if (
        containerEl.scrollTop + containerEl.offsetHeight >=
          productListEl.offsetHeight &&
        products?.length < products?.length
      ) {
        loadMoreProducts();
      }
    };

    const containerEl = document.querySelector("#container");
    containerEl.addEventListener("scroll", handleScroll);

    return () => {
      containerEl.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  // const fetchProducts = async (page) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(`/api/products?page=${page}`);
  //     setProducts((prevProducts) => [...prevProducts, ...response.data]);
  //   } catch (error) {
  //     console.error("Failed to load products:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchProducts = (page) => {
    if (!isLoadingMore) setIsLoading(true);
    setProducts((prevProducts) => {
      collection;
      if (collection.toLowerCase() === "all") {
      } else {
        let collection;
        productItems.filter((item, index) => {
          item.ProductCategories;
        });
      }
      return [
        ...prevProducts,
        ...productItems.slice(
          prevProducts.length,
          isFirstLoad ? 8 : prevProducts.length + 8,
        ),
      ];
    });
    if (isFirstLoad) {
      setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
      }, 500);
    }
    if (isLoadingMore) {
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 5000);
    }
  };

  const loadMoreProducts = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="group mx-auto py-7 lg:px-4" ref={productListRef}>
      {isLoading ? (
        <>
          <Skeleton className="mb-7 h-7 w-3/12" />
          <Skeleton
            className="mb-7 h-7 w-2/12"
            classContainer="flex justify-center"
          />
          <Skeleton
            className="mb-7 h-7 w-1/12"
            items="2"
            classContainer="flex justify-between"
          />
          <div className="space-y-4">
            <div className="lg:max-auto -mx-4 mb-7 grid h-full w-screen grid-cols-12 gap-1 lg:w-full lg:gap-7">
              {(() => {
                const elements = [];
                for (let i = 0; i < 8; i++) {
                  elements.push(
                    <div
                      key={i}
                      className="col-span-6 aspect-card h-full w-full lg:col-span-3"
                    >
                      <Skeleton className="aspect-card" />
                    </div>,
                  );
                }
                return elements;
              })()}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-7">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              {pathnames.map((value, index) => {
                let to = `/${pathnames.slice(0, index + 1).join("/")}`;
                if (to === "/products") to = "/products/all";
                return (
                  <li key={index} className="flex items-center">
                    <Icon
                      className="h-6 w-6 text-gray-400"
                      name="chevron-right"
                      width={20}
                      fill={"#374151"}
                    />
                    {index === pathnames.length - 1 ? (
                      <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2">
                        {value}
                      </span>
                    ) : (
                      <Link
                        to={to}
                        className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2"
                      >
                        {value}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="mb-7 flex justify-center">
            <h1 className="text-4xl font-semibold">{collection}</h1>
          </div>
          <div className="mb-7 flex justify-between">
            <div className="relative">
              <Button
                type="link"
                text="filter"
                iconWidth={20}
                iconName="filter"
                onClick={toggleFilterMenu}
              />
              <ul
                className={`${filterMenuOpen ? "opacity-1 pointer-events-auto translate-y-0" : "pointer-events-none -translate-y-1/2 opacity-0"} absolute left-0 top-full z-10 mt-4 flex w-screen flex-wrap gap-7 border-t bg-white p-8 shadow-xl transition-all ease-out lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl`}
                // className="min-w pointer-events-none absolute -left-10 top-full z-50 flex w-screen flex-wrap gap-7 bg-white p-3 opacity-0 shadow-md transition-all group-hover:pointer-events-auto group-hover:opacity-100 lg:max-w-screen-lg lg:-translate-x-1/2 xl:max-w-screen-xl 2xl:max-w-screen-2xl"
              >
                {categoryList.map((category, index) => (
                  <li
                    key={category.categoryId}
                    className={category.categoryName}
                  >
                    <p className="mx-4 text-nowrap border-b border-gray-300 py-2 text-center font-semibold">
                      {category.categoryName}
                    </p>
                    <ul>
                      {category.categoryDetails.map((categoryDetail, index) => {
                        return (
                          <li
                            className={`px-4 py-2`}
                            key={categoryDetail.categoryDetailId}
                          >
                            <div className="flex items-center">
                              <input
                                className="hidden"
                                type="radio"
                                name="categories"
                                id={categoryDetail.categoryDetailId}
                                value={categoryDetail.categoryDetailId}
                                checked={
                                  selectedCategories ===
                                  categoryDetail.categoryDetailId
                                }
                                onChange={() =>
                                  setSelectedCategories(
                                    categoryDetail.categoryDetailId,
                                  )
                                }
                              />
                              <label
                                className="flex cursor-pointer items-center gap-2"
                                htmlFor={categoryDetail.categoryDetailId}
                              >
                                <span
                                  className={`relative h-5 w-5 rounded-full border-2 shadow-sm transition-all ease-in-out before:absolute before:left-1/2 before:top-1/2 before:h-3 before:w-3 before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] ${selectedCategories === categoryDetail.categoryDetailId ? "border-slate-900 before:scale-100 before:bg-slate-900" : "border-gray-200 before:scale-0 before:bg-transparent"} before:rounded-full`}
                                ></span>
                                <span>{categoryDetail.categoryDetailName}</span>
                              </label>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Button
                type="link"
                text="sort"
                iconWidth={20}
                iconName="sort"
                onClick={toggleSortMenu}
              />
              <div
                className={`${sortMenuOpen ? "opacity-1 pointer-events-auto translate-y-0" : "pointer-events-none -translate-y-1/2 opacity-0"} absolute top-full z-10 mt-4 w-96 border-t bg-white p-8 shadow-xl transition-all ease-out`}
                ref={dropdownRef}
                style={style}
              >
                <h1 className="text-md mb-3 border-b pb-3">Categories</h1>
                {sorts.map((sort, index) => {
                  return (
                    <li key={index} className="mb-2 list-none">
                      <div className="flex items-center">
                        <input
                          className="hidden"
                          type="radio"
                          name="categories"
                          id={sort.value}
                          value={sort.value}
                          checked={selectedSorts === sort.value}
                          onChange={() => setSelectedSorts(sort.value)}
                        />
                        <label
                          className="flex cursor-pointer items-center gap-2"
                          htmlFor={sort.value}
                        >
                          <span
                            className={`relative h-5 w-5 rounded-full border-2 shadow-sm transition-all ease-in-out before:absolute before:left-1/2 before:top-1/2 before:h-3 before:w-3 before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] ${selectedSorts === sort.value ? "border-slate-900 before:scale-100 before:bg-slate-900" : "border-gray-200 before:scale-0 before:bg-transparent"} before:rounded-full`}
                          ></span>
                          <span className="radio-text">{sort.text}</span>
                        </label>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:max-auto -mx-4 mb-7 grid h-full grid-cols-12 gap-1 lg:gap-7">
            {products.map((item) => (
              <div
                className="col-span-6 h-full w-full lg:col-span-3"
                key={item.productid}
              >
                <ProductItem item={item} />
              </div>
            ))}
          </div>
          {isLoadingMore && (
            <div className="space-y-4">
              <div className="mb-7 grid h-full w-full grid-cols-12 gap-2 lg:gap-7">
                {(() => {
                  const elements = [];
                  for (let i = 0; i < 8; i++) {
                    elements.push(
                      <div
                        key={i}
                        className="col-span-6 aspect-card h-full w-full lg:col-span-3"
                      >
                        <Skeleton className="aspect-card" />
                      </div>,
                    );
                  }
                  return elements;
                })()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListSection;
