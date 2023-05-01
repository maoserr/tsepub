import {TsEpub} from '../src';
import 'mocha';
import {expect} from "chai";

describe('Add chapter',
    () => {
        it('should return true', async() => {
            const tsepub = new TsEpub({
                author: "",
                description: "",
                i18n: "en",
                publisher: "",
                tags: [""],
                title: ""
            })
            tsepub.add("test", "blah")
            await tsepub.generate()
            expect(true).to.equal(true);
        });
    });
