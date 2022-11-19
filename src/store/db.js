export const actions = {
  async dbQuery({ dispatch }, { url, structuredQuery, parent }) {
    try {
      const res = await this.$db({
        method: 'POST',
        url,
        data: {
          structuredQuery
        },
        params: {
          parent
        }
      }),
      docs = res.data,
      result = []
      
      docs.forEach(async item => {
        const { document } = item
        if (document) {
          const paths = document['name'].split('/')
          const id = paths[paths.length - 1]
          const fields = await dispatch('sortData', document['fields'])
          result.push({ ...fields, id })
        }
      })
      
      return result
    } catch (err) {
      console.log(err)
    }
  },
  async dbDelete({ dispatch }, { url }) {
    try {
      const res = await this.$db({
        method: 'DELETE',
        url
      })
    } catch (err) {
      throw err
    }
  },
  async dbRead({ dispatch }, { url }) {
    try {
      const res = await this.$db({
        method: 'GET',
        url
      }),
      { fields, documents } = res.data

      if ( documents ) {
        const result = {}
        documents.forEach(async doc => {
          const array = doc.name.split('/')
          const id = array[array.length - 1]
          result[id] = await dispatch('sortData', doc['fields'])
        })
        return result
      } else {
        return fields ? dispatch('sortData', fields) : {}
      }
    } catch (err) {
      console.log(err)
    }
  },
  async dbCreate({ dispatch }, { url, collectionId, data, parent }) {
    try {
      const res = await this.$db({
        method: 'POST',
        url: `${url}`,
        params: {
          collectionId,
          parent: parent ? parent : 'projects/amenity-fitness/databases/(default)/documents'
        },
        data: {
          fields: await dispatch('formatData', data)
        }
      }),
      { fields, name } = res.data,
      split = name.split('/'),
      uid = split[split.length - 1]
      fields['id'] = { stringValue: uid }
      const sortedData = await dispatch('sortData', fields)
      return {
        ...sortedData,
        status: res.status
      }
    } catch (err) {
      console.log(err)
    }
  },
  async dbWrite({ dispatch }, { url, data }) {
    try {
      const str = [],
      fieldPaths = Object.keys(data)
      
      fieldPaths.forEach(field => {
        str.push('updateMask.fieldPaths' + "=" + encodeURIComponent(field))
      })
      const params = str.join("&"),
      res = await this.$db({
        method: 'PATCH',
        url: `${ url }?${ params }`,
        data: {
          fields: await dispatch('formatData', data)
        }
      }),
      { fields, name } = res.data,
      split = name.split('/'),
      uid = split[split.length - 1]
      fields['id'] = { stringValue: uid }
      return dispatch('sortData', fields)
    } catch (err) {
      const { data } = err.response
      throw data.error
    }
  },
  formatArray({}, array) {
    const modified = []
    array.forEach((value) => {
      const type = typeof value
      switch (true) {
        case type == 'string':
          modified.push({
            stringValue: value
          })
          break
        case type == 'number':
          modified.push({
            integerValue: value
          })
          break
        case type == 'boolean':
          modified.push({
            booleanValue: value
          })
          break
      }
    })
    return modified
  },
  async nestedData({ dispatch }, data) {
    if (data) {
      const keys = Object.keys(data)
      const values = Object.values(data)
  
      const modified = {}
      keys.forEach(async (key, i) => {
        const value = values[i]
        const type = typeof value
        switch (true) {
          case Object.prototype.toString.call(value) === "[object Date]":
            modified[key] = {
              timestampValue: value
            }
            break
          case type == 'string':
            modified[key] = {
              stringValue: value
            }
            break
          case type == 'number':
            modified[key] = {
              integerValue: value
            }
            break
          case type == 'boolean':
            modified[key] = {
              booleanValue: value
            }
            break
          case type == 'object':
            if (Array.isArray(value)) {
              let modValues = []
              value.forEach(async val => {
                modValues.push(await dispatch('formatData', val))
              })
              modified[key] = {
                arrayValue: { 
                  values: modValues
                }
              }
            } else {
              const fields = await dispatch('formatData', value)
              if (fields) {
                modified[key] = {
                  mapValue: {
                    fields
                  }
                }
              } else {
                modified[key] = {
                  nullValue: null
                }
              }
            }
            break
        }
      })
      return modified
    }
  },
  async formatData({ dispatch }, data) {
    if (data) {
      const keys = Object.keys(data)
      const values = Object.values(data)
  
      const modified = {}
      keys.forEach(async (key, i) => {
        const value = values[i]
        const type = typeof value
        switch (true) {
          case Object.prototype.toString.call(value) === "[object Date]":
            modified[key] = {
              timestampValue: value
            }
            break
          case type == 'string':
            modified[key] = {
              stringValue: value
            }
            break
          case type == 'number':
            modified[key] = {
              integerValue: value
            }
            break
          case type == 'boolean':
            modified[key] = {
              booleanValue: value
            }
            break
          case type == 'object':
            if (Array.isArray(value)) {
              let modValues = []
              value.forEach(async val => {
                modValues.push({ 
                  mapValue: {
                    fields: await dispatch('formatData', val)
                  }
                })
              })
              // if (key == 'circuit') {
              //   console.log(key)
              //   modified['mapValue'] = {
              //     fields: {
              //       [key]: {
              //         arrayValue: {
              //           values: modValues
              //         }
              //       }
              //     }
              //   }
              // } else {
              modified[key] = {
                arrayValue: { 
                  values: modValues
                }
              }
              // }
            } else {
              const fields = await dispatch('formatData', value)
              if (fields) {
                modified[key] = {
                  mapValue: {
                    fields
                  }
                }
              } else {
                modified[key] = {
                  nullValue: null
                }
              }
            }
            break
        }
      })
      return modified
    }
  },
  sortArray({ dispatch }, values) {
    const modified = []
    values.forEach(async (key, i) => {
      const value = values[i]
      const valueKey = Object.keys(values[i])[0]
      switch(true) {
        case valueKey == 'nullValue':
          modified.push(value['nullValue'])
          break
        case valueKey == 'booleanValue':
          modified.push(value['booleanValue'])
          break
        case valueKey == 'stringValue':
          modified.push(value['stringValue'])
          break
        case valueKey == 'integerValue':
          modified.push(value['integerValue'])
          break
        case valueKey == 'arrayValue':
          // const array = value['arrayValue']
          // if ( array.values ) {
          //   modified[key] = await this.sortArray(value['arrayValue'].values)
          // } else {
          //   modified[key] = []
          // }
          // this.sortArray(value['arrayValue'].values)
          break
        case valueKey == 'mapValue':
          const map = value['mapValue']
          if ( Object.keys(map).length ) {
            modified.push(await dispatch('sortData', value['mapValue'].fields))
          } else {
            modified.push({})
          }
          break
        case valueKey == 'doubleValue':
          break
        case valueKey == 'timestampValue':
          modified.push(value['timestampValue'])
          break
        case valueKey == 'bytesValue':
          break
        case valueKey == 'geoPointValue':
          break
        case valueKey == 'referenceValue':
          break
        default:
          break
      }
    })
    return modified
  },
  async sortData({ dispatch }, fields) {
    if ( fields ) {
      const modified = {}
      const keys = Object.keys(fields)
      const values = Object.values(fields)
      keys.forEach(async (key, i) => {
        const value = values[i]
        const valueKey = Object.keys(values[i])[0]
        switch(true) {
          case valueKey == 'nullValue':
            modified[key] = value['nullValue']
            break
          case valueKey == 'booleanValue':
            modified[key] = value['booleanValue']
            break
          case valueKey == 'stringValue':
            modified[key] = value['stringValue']
            break
          case valueKey == 'integerValue':
            modified[key] = Number(value['integerValue'])
            break
          case valueKey == 'arrayValue':
            const array = value['arrayValue']
            if ( array.values ) {
              modified[key] = await dispatch('sortArray', value['arrayValue'].values)
            } else {
              modified[key] = []
            }
            break
          case valueKey == 'mapValue':
            const map = value['mapValue']
            if ( Object.keys(map).length ) {
              modified[key] = await dispatch('sortData', map.fields)
            } else {
              modified[key] = {}
            }
            break
          case valueKey == 'doubleValue':
            break
          case valueKey == 'timestampValue':
            modified[key] = value['timestampValue']
            break
          case valueKey == 'bytesValue':
            break
          case valueKey == 'geoPointValue':
            break
          case valueKey == 'referenceValue':
            break
          default:
            break
        }
      })
      return modified
    }
  },
}