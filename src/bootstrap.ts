// load config and fail fast in case of error
import './providers/config';

// register handlers for uncaught exceptions early
import './bootstrap/error_handlers';

// load the rest of modules
import './bootstrap/log_extension';
import './bootstrap/dayjs_config';
