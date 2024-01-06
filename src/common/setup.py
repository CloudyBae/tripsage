#!/usr/bin/env python

from setuptools import setup, find_packages

setup(
    name="common",
    description="Trip Sage common code",
    author="YooJinBae",
    packages=find_packages(exclude=["tests.*", "tests"]),
    python_requires=">=3.10.0",
    include_package_data=True,
    install_requires=[
        "aws_lambda_powertools",
        "botocore",
        "boto3",
        "dataclasses-json"
    ]
)