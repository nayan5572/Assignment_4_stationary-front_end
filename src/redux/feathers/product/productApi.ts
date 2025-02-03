import { TProduct, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });

                }
                return {
                    url: '/products',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['products'],
            transformResponse: (response: TResponseRedux<TProduct[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        createProduct: builder.mutation({
            query: (userInfo) => ({
                url: '/products',
                method: 'POST',
                body: userInfo
            }),
            invalidatesTags: ['products']
        }),
        confirmOrder: builder.mutation({
            query: (userInfo) => ({
                url: '/orders/confirm-order',
                method: 'POST',
                body: userInfo
            })
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: TResponseRedux<TProduct>) => {
                return response.data
            }
        }),
    })
})

export const { useCreateProductMutation, useGetAllProductsQuery, useGetSingleProductQuery, useConfirmOrderMutation } = productApi