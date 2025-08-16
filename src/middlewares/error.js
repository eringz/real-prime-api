export const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.stattus || 500).json({
        message: err.message || 'Internal Server Error', 
    });
};