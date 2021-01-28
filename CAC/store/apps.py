from django.apps import AppConfig


class StoreConfig(AppConfig):
    name = 'store'

    def ready(self):
        from store.forecastPurge import forecastAPI
        forecastAPI.start()