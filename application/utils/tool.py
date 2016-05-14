# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 23:20

import arrow


def now(naive=True):
    n = arrow.utcnow()
    return n.naive if naive else n


def success(data, message=None, code=0):
    return {
        "data": data,
        "meta": {
            "code": code,
            "message": message
        }
    }


def fail(code, message=None, data=None):
    return {
        "data": data,
        "meta": {
            "code": code,
            "message": message
        }
    }


def paginate_to_json(paginate):
    iter_pages = list()
    for i in paginate.iter_pages():
        if i:
            iter_pages.append(i)
        else:
            iter_pages.append(None)
    return {
        'page': paginate.page,
        'pages': paginate.pages,
        'totle': paginate.total,
        'has_prev': paginate.has_prev,
        'has_next': paginate.has_next,
        'next_num': paginate.next_num,
        'prev_num': paginate.prev_num,
        'per_page': paginate.per_page,
        'iter_pages': iter_pages
    }