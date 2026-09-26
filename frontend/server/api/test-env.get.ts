// server/api/test-env.get.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);

  // const key = config.web3formsAccessKey

  return {
    status: "success",
    // isKeyLoaded: !!key,
    // keyPreview: key ? `${key.substring(0, 4)}***` : 'NOT_FOUND'
  };
});
