### vkui-sign-checker

Компонент nodejs, позволяющий осуществлять проверку подписи.

### Документация
`check` - функция, принимающая первый аргумент в виде `vk_access_token_settings=notify&vk_app_id=7217368&vk_are_notifications_enabled=1&vk_is_app_user=0&vk_language=ru&vk_platform=ios&vk_user_id=5438787&sign=udfuSDNJKDB6u231jknDKJSDskjsh72n` и второй аргумент в качестве секретного ключа, например, `8FUPuxsCIb0FQOORNSWh` и  возвращающая промис.

### Использование
    app.post("/delete", (req, res) => {
    	const sign = req.body.sign;
    
    	if (typeof sign != undefined && sign != null)
    		signChecker
    			.check(sign, key)
    			.then(success =>
    				res.status(200).send(success)
    			)
    			.catch(error => res.status(401).send(error));
    	else res.status(401).send({ success: "false" });
    });
