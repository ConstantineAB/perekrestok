import ContentLoader from "react-content-loader"

const LoadingBlock = () => {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb" 
        >
            <rect x="76" y="10" rx="20" ry="20" width="140" height="40" /> 
            <rect x="9" y="80" rx="5" ry="5" width="100" height="30" /> 
            <rect x="10" y="150" rx="0" ry="0" width="100" height="25" /> 
            <rect x="22" y="202" rx="10" ry="10" width="248" height="249" />
        </ContentLoader>
    )
}

export default LoadingBlock