import { Flex, Wrap, VStack, GridItem, Heading } from "@chakra-ui/react";
import { StoreItem } from "@/components/store/StoreItem";
import { fetchProducts } from "@/lib/stripe";
import { StoreCartSection } from "@/components/store/StoreCartSection";

async function StorePage() {
  const products = await fetchProducts();
  if (!products) console.log("Products is null")
  const backendDown = !products

  return (
    <VStack w={"100%"}>
      <Flex
        w={"100%"}
        h={"100%"}
        minH={"100vh"}
        p={"20px"}
        justify={"center"}>        
        {(!backendDown && products.length > 0) && <Wrap h={"100%"} gap={"10px"} justify={"center"}>
          {products.map(product => (
            <GridItem key={product.productId}>
              <StoreItem
                productId={product.productId}
                priceId={product.priceId}
                name={product.name}
                description={product.description || ""}
                images={product.images || ["/tiling_background.jpeg"]}
                unitPrice={product.unitPrice}
              />
            </GridItem>
          ))}
          <StoreCartSection />
        </Wrap>}
        {(!backendDown && products.length <= 0) && <Heading p={"25px"}>We have no products to sell. Check again another time!</Heading>}
        {backendDown && <Heading p={"25px"}>Duck no! Our servers are having issues :(</Heading>}
      </Flex>
    </VStack>
  )
}

export default StorePage;