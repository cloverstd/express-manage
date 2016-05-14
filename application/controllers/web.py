# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 22:52

from flask import Blueprint, render_template

bp = Blueprint(
    __name__,
    "web"
)


@bp.route('/')
def index():
    return render_template("index.html")


@bp.route('/m')
def mobile():
    return render_template("mobile.html")