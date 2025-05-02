const service = require('#root/src/domain/sync/service.js');
const AppError = require('#root/src/shared/constants/errors/AppError.js');
const { formatResponse } = require('#root/src/shared/utils/http/response.js');

exports.syncOfflineData = async (req, res, next) => {
  try {
    const data = req.body;
    const results = await service.syncOfflineData(data);

    // Check if any records were created or updated
    if (!results || results.length === 0) {
      return res.status(404).json(formatResponse({
        success: false,
        statusCode: 404,
        message: 'No records found to synchronize',
      }));
    }

    res.status(200).json(formatResponse({
      success: true,
      statusCode: 200,
      data: results,
      message: 'Data synchronized successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
