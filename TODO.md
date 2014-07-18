1. get a local copy of react library (and JSX Transformer)
2. include requirejs as a dependency of the repo.
3. split contents of scripts/multiValueSelect.js into requirejs modules
4. add some tests:
  * introduce some test framework (e.g. mocha) as a dependency
  * instantiate a multivalueSelect inside of a test and pass it some fake data (e.g. jackson5)
  * use JS (i.e. trigger events, e.g. keydown, click) to interact with the multiValueSelect html elements and inspect the dom to ensure that the values are appropriate

* here are some tests we'll definitely want to have:
  * use dom inspection to ensure that 'selected' items are removed from choices list
  * ensure that after input has been received in the field, the only choices visible are those we expect to see
  * ensure that list item removal works
  * ensure that select items can either be submitted as `<form>` input data OR serialized into some JSON that we would send (pick one? pick both?)
