export const propsWithMessage = (message: string, ...props: any) => ({
  props: {
    ...props,
    message,
  },
});

export const redirect = (destination: string, permanent: boolean = true) => ({
  redirect: {
    destination,
    permanent: permanent,
  },
});
