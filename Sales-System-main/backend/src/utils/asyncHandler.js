// Creating an asyncHandler to handle all the async controllers appropriately

export default function asyncHandler(reqHandler) {
    return function (req, res, next) {
        Promise.resolve(reqHandler(req, res)).catch(next);
    }
}