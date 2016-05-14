"""empty message

Revision ID: 6e1dd7862f5a
Revises: e104ca36d471
Create Date: 2016-05-11 20:18:06.692190

"""

# revision identifiers, used by Alembic.
revision = '6e1dd7862f5a'
down_revision = 'e104ca36d471'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('company', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.drop_column('company', 'created_name')
    op.add_column('member', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('member', sa.Column('password', sa.String(length=128), nullable=False))
    op.drop_column('member', 'created_name')
    op.add_column('order', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.drop_column('order', 'created_name')
    op.add_column('store', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.drop_column('store', 'created_name')
    op.add_column('user', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.drop_column('user', 'created_name')
    op.add_column('user_name', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.drop_column('user_name', 'created_name')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_name', sa.Column('created_name', mysql.DATETIME(), nullable=True))
    op.drop_column('user_name', 'created_at')
    op.add_column('user', sa.Column('created_name', mysql.DATETIME(), nullable=True))
    op.drop_column('user', 'created_at')
    op.add_column('store', sa.Column('created_name', mysql.DATETIME(), nullable=True))
    op.drop_column('store', 'created_at')
    op.add_column('order', sa.Column('created_name', mysql.DATETIME(), nullable=True))
    op.drop_column('order', 'created_at')
    op.add_column('member', sa.Column('created_name', mysql.DATETIME(), nullable=True))
    op.drop_column('member', 'password')
    op.drop_column('member', 'created_at')
    op.add_column('company', sa.Column('created_name', mysql.DATETIME(), nullable=True))
    op.drop_column('company', 'created_at')
    ### end Alembic commands ###