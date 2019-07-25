.PHONY: dev build new

dev:
	npm run dev

build:
	npm run generate
	mv docs/CNAME .
	mv dist/ docs/
	mv CNAME docs

new:
	npm run new-incident
