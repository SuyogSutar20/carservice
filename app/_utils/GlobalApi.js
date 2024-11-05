const { gql, default: request } = require("graphql-request");

const MASTER_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory =async () =>{
    const query=gql`
    query Categories {
      catagories(first: 50) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
    
    `

    const result=await request(MASTER_URL,query);
    return result;
}

const GetCarServices=async(category) =>{
  const query=gql`
  query GetServices {
    carServicenews(where: {catagories_some: {slug: "`+category+`"}}) {
      aboutservice
      address
      serviceimage {
        url
      }
      catagories {
        name
      }
      id
      name
      carType
      workingHrs
      price
    }
  }
  `
  const result=await request(MASTER_URL,query);
    return result;
}


const AddToCart=async (data)=>{
  const query=gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+data?.email+`", productName: "`+data?.name+`", price: `+data?.price+`, productImage: "`+data?.productImage+`", productDescription: "`+data?.description+`" carServicenew: {connect: {slug: "`+data.carserviceSliug+`"}}}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result=await request(MASTER_URL,query);
    return result;
}

const GetUserCart=async(userEmail)=>{
  const query=gql`
  query GetUserCart {
    userCarts(where: {email: "`+userEmail+`"}) {
      id
      price
      productDescription
      productImage
      productName
      carServicenew {
        name
        serviceimage {
          url
        }
        slug
      }
    }
  }
  `
  const result=await request(MASTER_URL,query);
    return result;
}

export default{
    GetCategory,
    GetCarServices,
    AddToCart,
    GetUserCart
}