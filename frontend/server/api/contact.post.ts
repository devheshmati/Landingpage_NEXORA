// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  const { name, email, service, message } = body;

  // validation
  if (!config.web3formsAccessKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Server configuration error: Access key is missing.",
    });
  }

  // form input validation
  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "All required fields must be provided.",
    });
  }

  try {
    const response = await $fetch<{ success: boolean; message?: string }>(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: {
          access_key: config.web3formsAccessKey,
          name,
          email,
          service: service || "Web Development",
          message,
          subject: `New Lead from NEXORA: ${name}`,
        },
      },
    );

    if (!response.success) {
      throw createError({
        statusCode: 400,
        statusMessage: response.message || "Failed to submit form.",
      });
    }

    return { success: true };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Internal server error.",
    });
  }
});
