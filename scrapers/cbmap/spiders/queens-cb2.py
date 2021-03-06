import scrapy

from cbmap.utils import parse_calendarjs


class QueensCb2Spider(scrapy.Spider):
    name = 'queens-cb2'
    title = 'Queens CB2'
    start_urls = [
        'http://www.nyc.gov/html/qnscb2/includes/scripts/calendar.js'
    ]

    def parse(self, response):
        for item in parse_calendarjs(response):
            yield item
