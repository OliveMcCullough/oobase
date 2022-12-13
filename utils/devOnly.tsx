import { GetServerSideProps } from "next";

export const devOnly:GetServerSideProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        }
    }

    return { props: {} };
}