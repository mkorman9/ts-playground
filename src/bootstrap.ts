// load config and fail fast in case of error
import './providers/config';

// register dayjs plugins
import './bootstrap/dayjs_config';

// register handlers for uncaught exceptions
import './bootstrap/error_handlers';
