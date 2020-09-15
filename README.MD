### vkui-sign-checker

Компонент nodejs, позволяющий осуществлять проверку подписи для приложений VK Mini Apps.

### Документация
`check` - промис, принимающая аргумент в виде `vk_access_token_settings=notify&vk_app_id=7217368&vk_are_notifications_enabled=1&vk_is_app_user=0&vk_language=ru&vk_platform=ios&vk_user_id=5438787&sign=udfuSDNJKDB6u231jknDKJSDskjsh72n`, и второй аргумент в качестве секретного ключа, например, `8FUPuxsCIb0FQOORNSWh` и  возвращающая параметры подписи.

### Использование
     const check = require("vkui-sign-checker");
    
        app.use(function(req, res, next) {
            const x_sign_header = req.headers[`x-sign-header`].slice(1);
        
            check(x_sign_header)
                .then(params => {
                    req.body = { params, ...req.body };
                    next();
                })
                .catch(() => {
                    next(createError(401));
                });
        });